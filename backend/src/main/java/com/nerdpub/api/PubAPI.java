package com.nerdpub.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import com.nerdpub.dto.PubDTO;
import com.nerdpub.service.PubService;


@RestController
@RequestMapping("api/pubs")
@CrossOrigin(origins = "http://localhost:4200")
public class PubAPI {

    @Autowired
    private PubService pubService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody PubDTO dto) {
        try {
            return ResponseEntity.status(201).body(pubService.create(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody PubDTO dto) {
        try {
            dto.setId(id);
            return ResponseEntity.ok(pubService.update(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        pubService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PubDTO> findById(@PathVariable int id) {
        return ResponseEntity.ok(pubService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<PubDTO>> search(
            @RequestParam(required = false) String city
    ) {
        if (city != null) {
            return ResponseEntity.ok(pubService.findByCity(city));
        }

        return ResponseEntity.ok(pubService.findAll());
    }
}

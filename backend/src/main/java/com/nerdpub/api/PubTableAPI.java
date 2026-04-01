package com.nerdpub.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.PubTableDTO;
import com.nerdpub.service.PubTableService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/tables")
@CrossOrigin(origins = "http://localhost:4200")
public class PubTableAPI {

    @Autowired
    private PubTableService tableService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody @Valid PubTableDTO dto) {
        try {
            return ResponseEntity.status(201).body(tableService.create(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody PubTableDTO dto) {
        try {
            dto.setId(id);
            return ResponseEntity.ok(tableService.update(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        tableService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PubTableDTO> findById(@PathVariable int id) {
        return ResponseEntity.ok(tableService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<PubTableDTO>> search(
            @RequestParam(required = false) String name
    ) {
        if (name != null) {
            return ResponseEntity.ok(tableService.findByNameContaining(name));
        }

        return ResponseEntity.ok(tableService.findAll());
    }

    @GetMapping("/pub/{id}")
    public ResponseEntity<List<PubTableDTO>> findByPubId(@PathVariable int id) {
        List<PubTableDTO> tables = tableService.findByPubId(id);
        return ResponseEntity.ok(tables);
    }

    
}
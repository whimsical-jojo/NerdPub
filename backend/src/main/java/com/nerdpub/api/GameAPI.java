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
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.GameDTO;
import com.nerdpub.service.GameService;

import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("api/games")
@CrossOrigin(origins = "http://localhost:4200")
public class GameAPI {

    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody GameDTO dto) {
        try {
            return ResponseEntity.status(201).body(gameService.create(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody GameDTO dto) {
        try {
            dto.setId(id);
            return ResponseEntity.ok(gameService.update(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        gameService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameDTO> findById(@PathVariable int id) {
        return ResponseEntity.ok(gameService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<GameDTO>> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String pubName
    )
    {
        if (title != null) {
            return ResponseEntity.ok(gameService.findByTitleContaining(title));
        }

        if (pubName != null) {
            return ResponseEntity.ok(gameService.findByPubName(pubName));
        }

        return ResponseEntity.ok(gameService.findAll());
    }
}
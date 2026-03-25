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

import com.nerdpub.dto.GameSessionDTO;
import com.nerdpub.service.GameSessionService;

@RestController
@RequestMapping("api/game-sessions")
@CrossOrigin(origins = "http://localhost:4200")
public class GameSessionAPI {

    @Autowired
    private GameSessionService gameSessionService;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody GameSessionDTO dto) {
        try {
            return ResponseEntity.status(201).body(gameSessionService.create(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable int id, @RequestBody GameSessionDTO dto) {
        try {
            dto.setId(id);
            return ResponseEntity.ok(gameSessionService.update(dto));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        gameSessionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GameSessionDTO> findById(@PathVariable int id) {
        return ResponseEntity.ok(gameSessionService.findById(id));
    }

    @GetMapping
    public ResponseEntity<List<GameSessionDTO>> search(
            @RequestParam(required = false) Integer gameId,
            @RequestParam(required = false) Integer tableId,
            @RequestParam(required = false) String date
    ) {
        if (gameId != null) {
            return ResponseEntity.ok(gameSessionService.findByGameId(gameId));
        }

        if (tableId != null) {
            return ResponseEntity.ok(gameSessionService.findByTableId(tableId));
        }

        if (date != null) {
            return ResponseEntity.ok(gameSessionService.findByDate(date));
        }

        return ResponseEntity.ok(gameSessionService.findAll());
    }
}
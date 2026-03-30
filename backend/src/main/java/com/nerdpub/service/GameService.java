package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.GameDTO;
import com.nerdpub.mapper.GameMapper;
import com.nerdpub.model.Game;
import com.nerdpub.repository.GameRepository;

import jakarta.persistence.EntityNotFoundException;

/**
 * TODO only admins should be allowed to change certain things about the game
 */
@Service
public class GameService {
    @Autowired 
    GameRepository gameRepo;

    @Autowired
    private GameMapper mapper;

    public List<GameDTO> findAll() {
        return mapper.toDTOs(gameRepo.findAll());
    }

    public GameDTO findById(int id) {
        Game game = gameRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + id));
        return mapper.toDTO(game);
    }

    public GameDTO create(GameDTO gameDTO) {
        Game game = mapper.toEntity(gameDTO);
        game = gameRepo.save(game);
        return mapper.toDTO(game);
    }

    public void deleteById(int id) {
        gameRepo.deleteById(id);
    }

    public List<GameDTO> findByTitleContaining(String title) {
        return mapper.toDTOs(gameRepo.findByTitleContaining(title));
    }

    public GameDTO update(GameDTO dto) {
        Game game = gameRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Game not found."));

        mapper.updateFromDTO(dto, game);
        game = gameRepo.save(game);

        return mapper.toDTO(game);
    }

    public List<GameDTO> findByPubName(String pubName) {
        List<GameDTO> games = mapper.toDTOs(gameRepo.findByPubName(pubName));
        return games;
    }
}

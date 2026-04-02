package com.nerdpub.service;

import java.time.LocalDate;
import java.util.List;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.GameSessionDTO;
import com.nerdpub.exception.TableNotAvailableException;
import com.nerdpub.mapper.GameSessionMapper;
import com.nerdpub.model.Game;
import com.nerdpub.model.GameSession;
import com.nerdpub.model.PubTable;
import com.nerdpub.repository.GameRepository;
import com.nerdpub.repository.GameSessionRepository;
import com.nerdpub.repository.PubTableRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class GameSessionService {

    @Autowired
    private GameSessionRepository gameSessionRepo;

    @Autowired
    private GameSessionMapper mapper;

    @Autowired
    private GameRepository gameRepo;

    @Autowired
    private PubTableRepository tableRepo;


    public List<GameSessionDTO> findAll() {
        return mapper.toDTOs(gameSessionRepo.findAll());
    }

    public GameSessionDTO findById(int id) {
        GameSession session = gameSessionRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("GameSession not found with id: " + id));
        return mapper.toDTO(session);
    }

    public GameSessionDTO create(GameSessionDTO dto) {
        GameSession session = mapper.toEntity(dto);
        System.out.println(dto.toString());
        Game game = gameRepo.findById(dto.getGameId())
                .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + dto.getGameId()));

        PubTable table = tableRepo.findById(dto.getTableId())
                .orElseThrow(() -> new EntityNotFoundException("Table not found with id: " + dto.getTableId()));

        //If there already is a session on that day on that table, throw TableNotAvailableException
        if (gameSessionRepo.findByDateAndTableId(session.getDate(),table.getId()).size() > 0)
            throw new TableNotAvailableException("Table already has an ongoin session on that day");

        
        session.setGame(game);
        session.setTable(table);

        session = gameSessionRepo.save(session);
        return mapper.toDTO(session);
    }

    public void deleteById(int id) {
        gameSessionRepo.deleteById(id);
    }

    public GameSessionDTO update(GameSessionDTO dto) {
        GameSession session = gameSessionRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("GameSession not found."));

        mapper.updateFromDTO(dto, session);

        if (dto.getGameId() != 0) {
            Game game = gameRepo.findById(dto.getGameId())
                    .orElseThrow(() -> new EntityNotFoundException("Game not found with id: " + dto.getGameId()));
            session.setGame(game);
        }

        if (dto.getTableId() != 0) {
            PubTable table = tableRepo.findById(dto.getTableId())
                    .orElseThrow(() -> new EntityNotFoundException("Table not found with id: " + dto.getTableId()));
            session.setTable(table);
        }

        if (gameSessionRepo.findByDateAndTableId(session.getDate(),dto.getTableId()).size() > 0)
            throw new TableNotAvailableException("Table already has an ongoing session on that day");

        session = gameSessionRepo.save(session);
        return mapper.toDTO(session);
    }


    public List<GameSessionDTO> findByGameId(int gameId) {
        return mapper.toDTOs(gameSessionRepo.findByGameId(gameId));
    }

    public List<GameSessionDTO> findByCity(String city) {
        return mapper.toDTOs(gameSessionRepo.findByCity(city));
    }

    public List<GameSessionDTO> search(String game, Integer days, String city) {
        return mapper.toDTOs(gameSessionRepo.search(game, days, city));
    }

    public List<GameSessionDTO> gamesTonight(String city) {
        return mapper.toDTOs(gameSessionRepo.gamesTonight(city));
    }

}
package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.PubDTO;
import com.nerdpub.mapper.PubMapper;
import com.nerdpub.model.Game;
import com.nerdpub.model.Pub;
import com.nerdpub.model.PubTable;
import com.nerdpub.repository.GameRepository;
import com.nerdpub.repository.PubRepository;
import com.nerdpub.repository.PubTableRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PubService {

    @Autowired
    private PubRepository pubRepo;

    @Autowired
    private PubMapper mapper;

    @Autowired
    private GameRepository gameRepo;

    @Autowired
    private PubTableRepository tableRepo;

    public List<PubDTO> findAll() {
        List<Pub> pubs = pubRepo.findAll();
        return pubs.stream().map(this::toDTOWithRelations).toList();
    }

    public PubDTO findById(int id) {
        Pub pub = pubRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + id));
        return toDTOWithRelations(pub);
    }

    public PubDTO create(PubDTO dto) {
        Pub pub = mapper.toEntity(dto);

        //Handles the games and tables, although then again, no tables are getting created without a pub.
        pub = handlePubRelationships(dto, pub);

        pub = pubRepo.save(pub);
        return toDTOWithRelations(pub);
    }

    public PubDTO update(PubDTO dto) {
        Pub pub = pubRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + dto.getId()));

        mapper.updateFromDTO(dto, pub);

        //Handles the games and tables
        pub = handlePubRelationships(dto, pub);

        pub = pubRepo.save(pub);
        return toDTOWithRelations(pub);
    }

    public void deleteById(int id) {
        pubRepo.deleteById(id);
    }

    public List<PubDTO> findByCity(String city) {
        return pubRepo.findByCity(city)
                .stream()
                .map(this::toDTOWithRelations)
                .toList();
    }

    private PubDTO toDTOWithRelations(Pub pub) {
        PubDTO dto = mapper.toDTO(pub);

        if (pub.getGames() != null) {
            dto.setGameIds(
                    pub.getGames().stream()
                            .map(Game::getId)
                            .toList()
            );
        }

        if (pub.getTables() != null) {
            dto.setTableIds(
                    pub.getTables().stream()
                            .map(PubTable::getId)
                            .toList()
            );
        }

        return dto;
    }

    private Pub handlePubRelationships (PubDTO dto, Pub pub) {
        // Update games
        if (dto.getGameIds() != null) {
            List<Game> games = gameRepo.findAllById(dto.getGameIds());
            pub.setGames(games);
        }

        // Update tables
        if (dto.getTableIds() != null) {
            List<PubTable> tables = tableRepo.findAllById(dto.getTableIds());
            pub.setTables(tables);

            // maintain bidirectional consistency
            tables.forEach(t -> t.setPub(pub));
        }

        return pub;
    }
}
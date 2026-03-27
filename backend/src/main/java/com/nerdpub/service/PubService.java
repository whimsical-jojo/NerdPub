package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.PubDTO;
import com.nerdpub.mapper.PubMapper;
import com.nerdpub.model.Pub;
import com.nerdpub.repository.PubRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PubService {

    @Autowired
    private PubRepository pubRepo;

    @Autowired
    private PubMapper mapper;

    public List<PubDTO> findAll() {
        List<Pub> pubs = pubRepo.findAll();
        return mapper.toDTOs(pubs);
    }

    public PubDTO findById(int id) {
        Pub pub = pubRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + id));
        return mapper.toDTO(pub);
    }

    public PubDTO create(PubDTO dto) {
        Pub pub = mapper.toEntity(dto);

        pub = pubRepo.save(pub);
        return mapper.toDTO(pub);
    }

    public PubDTO update(PubDTO dto) {
        Pub pub = pubRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + dto.getId()));

        mapper.updateFromDTO(dto, pub);

        pub = pubRepo.save(pub);
        return mapper.toDTO(pub);
    }

    public void deleteById(int id) {
        pubRepo.deleteById(id);
    }

    public List<PubDTO> findByCity(String city) {
        return mapper.toDTOs(pubRepo.findByCity(city));
    }

    public List<String> getCities() {
        return pubRepo.getCities();
    }
}
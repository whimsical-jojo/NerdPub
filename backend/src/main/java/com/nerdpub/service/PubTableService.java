package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.PubTableDTO;
import com.nerdpub.mapper.PubTableMapper;
import com.nerdpub.model.PubTable;
import com.nerdpub.repository.PubTableRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class PubTableService {

    @Autowired
    private PubTableRepository tableRepo;

    @Autowired
    private PubTableMapper mapper;

    public List<PubTableDTO> findAll() {
        return mapper.toDTOs(tableRepo.findAll());
    }

    public PubTableDTO findById(int id) {
        PubTable table = tableRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Table not found with id: " + id));
        return mapper.toDTO(table);
    }

    public PubTableDTO create(PubTableDTO dto) {
        PubTable table = mapper.toEntity(dto);
        table = tableRepo.save(table);
        return mapper.toDTO(table);
    }

    public PubTableDTO update(PubTableDTO dto) {
        PubTable table = tableRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Table not found."));

        mapper.updateFromDTO(dto, table);
        table = tableRepo.save(table);

        return mapper.toDTO(table);
    }

    public void deleteById(int id) {
        tableRepo.deleteById(id);
    }

    public List<PubTableDTO> findByNameContaining(String name) {
        return mapper.toDTOs(tableRepo.findByNameContaining(name));
    }
}
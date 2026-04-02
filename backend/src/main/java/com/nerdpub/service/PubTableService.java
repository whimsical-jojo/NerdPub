package com.nerdpub.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.PubTableDTO;
import com.nerdpub.mapper.PubTableMapper;
import com.nerdpub.model.Pub;
import com.nerdpub.model.PubTable;
import com.nerdpub.repository.GameSessionBookingRepository;
import com.nerdpub.repository.GameSessionRepository;
import com.nerdpub.repository.PubRepository;
import com.nerdpub.repository.PubTableRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class PubTableService {

    @Autowired
    private PubRepository pubRepo;

    @Autowired
    private PubTableRepository tableRepo;

    @Autowired
    private PubTableMapper mapper;

    @Autowired
    private GameSessionRepository sessionRepository;

    @Autowired
    private GameSessionBookingRepository bookingRepository;


    public List<PubTableDTO> findAll() {
        return mapper.toDTOs(tableRepo.findAll());
    }

    public PubTableDTO findById(int id) {
        PubTable table = tableRepo.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Table not found with id: " + id));
        return mapper.toDTO(table);
    }

    public PubTableDTO create(@Valid PubTableDTO dto) {
        PubTable table = mapper.toEntity(dto);
        Pub pub = pubRepo.findById(dto.getPubId())
                .orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + dto.getPubId()));
        table.setPub(pub);
        table = tableRepo.save(table);
        return mapper.toDTO(table);
    }

    public PubTableDTO update(PubTableDTO dto) {
        PubTable table = tableRepo.findById(dto.getId())
                .orElseThrow(() -> new EntityNotFoundException("Table not found."));

        if (pubRepo.findById(dto.getPubId()).isEmpty())
            throw new EntityNotFoundException("Pub not found with id: " + dto.getPubId());
        
        mapper.updateFromDTO(dto, table);
        table = tableRepo.save(table);

        return mapper.toDTO(table);
    }

    @Transactional
    public void deleteById(int tableId) {
        
        LocalDate today = LocalDate.now();

        // 1. Delete all BOOKINGS for future sessions of this table
        // We do this first because of the FK: Booking -> Session
        bookingRepository.deleteBySessionTableIdAndSessionDateAfter(tableId, today);

        // 2. Delete all future SESSIONS for this table
        sessionRepository.deleteFutureSessionsByTable(tableId, today);

        // 3. For PAST sessions: We need to "nullify" the table reference 
        // OR the DB will still block the delete.
        // Option: Point them to a "System/Deleted" table or set table_id to NULL
        sessionRepository.detachPastSessionsFromTable(tableId, today);

        // 4. Finally, delete the table
        tableRepo.deleteById(tableId);
    }


    public List<PubTableDTO> findByNameContaining(String name) {
        return mapper.toDTOs(tableRepo.findByNameContaining(name));
    }

    public List<PubTableDTO> findByPubId(int id) {
        return mapper.toDTOs(tableRepo.findByPubId(id));
    }

    public List<PubTableDTO> findAvailableTablesByPubId(int id, LocalDate parsedDate) {
        Pub pub = pubRepo.findById(id).orElseThrow(() -> new EntityNotFoundException("Pub not found with id: " + id));
        List<PubTable> tables = tableRepo.findAvailableTablesByPubId(id, parsedDate);
        return mapper.toDTOs(tables);
    }
}
package com.nerdpub.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.MemberDTO;
import com.nerdpub.service.MemberService;

@RequestMapping("/api/members")
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class MemberAPI {
    @Autowired
    private MemberService service;

    /**
     * Find a specific user by their id
     * @param id
     * @return
     */
    @GetMapping("/{id}")
    public MemberDTO findById(@PathVariable int id) {
        return service.findById(id);
    }

    /**
     * Search for a user by their username
     * @param username
     * @return
     */
    @GetMapping
    public List<MemberDTO> findByUsernameContaining(@RequestParam String username) {
        return service.findByUsernameOrLastNameContaining(username);
    }

    /**
     * Bans/ unbans a user by their id. Note that baning automatically deletes all their future bookings
     * @param memberId
     * @return
     */
    @PutMapping("/{id}")
    public MemberDTO toggleBan(@PathVariable int id) {
        MemberDTO dto = service.toggleBan(id);
        return dto;
    }
}

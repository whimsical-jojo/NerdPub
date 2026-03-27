package com.nerdpub.api;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nerdpub.dto.LoginDTO;
import com.nerdpub.dto.MemberDTO;
import com.nerdpub.dto.TokenDTO;
import com.nerdpub.service.AccountManagementService;

@RestController
@RequestMapping("/api/account")
@CrossOrigin(origins = "http://localhost:4200")
public class AccountManagementAPI
{
	@Autowired
	AccountManagementService service;
	
	@PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO) {
        String jwt = service.login(loginDTO);
        if (jwt == null) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        return ResponseEntity.ok(new TokenDTO(jwt));
    }

    @PostMapping("/register")
    public ResponseEntity<Object> create(@RequestBody MemberDTO dto) {
        try {
            dto = service.create(dto);
            return ResponseEntity.status(201).body(dto);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable int id, @RequestBody MemberDTO dto) {
        try {
            dto.setId(id);
            dto = (MemberDTO) service.update(dto);
            return ResponseEntity.ok(dto);
        } catch (ConstraintViolationException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        service.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/current-user")
    public ResponseEntity<MemberDTO> getCurrentUser(Authentication authentication) {
        //What to do if there is no authentication? Is this really the best way to get the user details? 
        //What if someone tries to call the endpoint without being logged in?
        //TODO ask Ferdinando
        MemberDTO userDetails = service.getCurrentUser(authentication.getName());
        if (userDetails == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(service.getCurrentUser(authentication.getName()));
    }

}
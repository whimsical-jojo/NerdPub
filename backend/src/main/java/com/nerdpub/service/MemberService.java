package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.nerdpub.dto.MemberDTO;
import com.nerdpub.mapper.MemberMapper;
import com.nerdpub.model.Member;
import com.nerdpub.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;

public class MemberService {
    @Autowired
	MemberRepository memberRepository;
	
	@Autowired
	MemberMapper memberMapper;


	public List<MemberDTO> findAll() {
        return memberMapper.toDTOs(memberRepository.findAll());
    }

    public MemberDTO findById(int id) {
        Member member = memberRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + id));
        return memberMapper.toDTO(member);
    }


    public MemberDTO findByUsername(String membername) {
        Member member = memberRepository.findByUsername(membername)
                .orElseThrow(() -> new EntityNotFoundException("User not found with membername:" + membername));
        return memberMapper.toDTO(member);
    }

    public List<MemberDTO> findByUsernameContaining(String membername) {
        return memberMapper.toDTOs(memberRepository.findByUsernameContaining(membername));
    }

}

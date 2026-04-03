package com.nerdpub.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nerdpub.dto.MemberDTO;
import com.nerdpub.mapper.MemberMapper;
import com.nerdpub.model.Member;
import com.nerdpub.repository.GameSessionBookingRepository;
import com.nerdpub.repository.MemberRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MemberService {
    @Autowired
	MemberRepository memberRepository;

    @Autowired
    GameSessionBookingRepository bookingRepo;
	
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

    public List<MemberDTO> findByUsernameOrLastNameContaining(String name) {
        return memberMapper.toDTOs(memberRepository.findByUsernameContainingOrLastNameContaining(name,name));
    }

    public MemberDTO toggleBan(int memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new EntityNotFoundException("User not found"));
        //if the member is getting banned now, delete all their future bookings
        if (!member.isBanned())
            bookingRepo.cancelMembersFutureBookings(memberId);

        member.setBanned(!member.isBanned());
        member = memberRepository.save(member);
        return memberMapper.toDTO(member);
    }

}

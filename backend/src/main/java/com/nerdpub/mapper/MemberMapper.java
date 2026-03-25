package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.MemberDTO;
import com.nerdpub.model.Member;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    public MemberDTO toDTO(Member member);
    public List<MemberDTO> toDTOs(List<Member> members);

    public Member toEntity(MemberDTO memberDTO);
    public List<Member> toEntities(List<MemberDTO> memberDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(MemberDTO memberDTO, @MappingTarget Member member);
}

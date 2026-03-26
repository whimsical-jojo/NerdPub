package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.PubTableDTO;
import com.nerdpub.model.PubTable;

@Mapper(componentModel = "spring")
public interface PubTableMapper {
    
    @Mapping(target = "pubId", source = "pub.id")
    public PubTableDTO toDTO(PubTable table);
    public List<PubTableDTO> toDTOs(List<PubTable> tables);

    @Mapping(target = "pub.id", source = "pubId")
    public PubTable toEntity(PubTableDTO tableDTO);
    public List<PubTable> toEntities(List<PubTableDTO> tableDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(PubTableDTO tableDTO, @MappingTarget PubTable table);
}

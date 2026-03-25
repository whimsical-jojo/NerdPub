package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.PubTableDTO;
import com.nerdpub.model.PubTable;

@Mapper(componentModel = "spring")
public interface PubTableMapper {
    public PubTableDTO toDTO(PubTable table);
    public List<PubTableDTO> toDTOs(List<PubTable> tables);

    public PubTable toEntity(PubTableDTO tableDTO);
    public List<PubTable> toEntities(List<PubTableDTO> tableDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(PubTableDTO tableDTO, @MappingTarget PubTable table);
}

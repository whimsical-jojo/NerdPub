package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.TableDTO;
import com.nerdpub.model.Table;

@Mapper(componentModel = "spring")
public interface TableMapper {
    public TableDTO toDTO(Table table);
    public List<TableDTO> toDTOs(List<Table> tables);

    public Table toEntity(TableDTO tableDTO);
    public List<Table> toEntities(List<TableDTO> tableDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(TableDTO tableDTO, @MappingTarget Table table);
}

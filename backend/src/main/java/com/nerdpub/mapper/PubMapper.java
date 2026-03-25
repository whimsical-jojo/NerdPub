package com.nerdpub.mapper;

import java.util.List;
import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;
import com.nerdpub.dto.PubDTO;
import com.nerdpub.model.Pub;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface PubMapper {

    @Mapping(target = "gameIds", ignore = true)
    @Mapping(target = "tableIds", ignore = true)
    PubDTO toDTO(Pub pub);

    List<PubDTO> toDTOs(List<Pub> pubs);

    @Mapping(target = "games", ignore = true)
    @Mapping(target = "tables", ignore = true)
    Pub toEntity(PubDTO pubDTO);

    List<Pub> toEntities(List<PubDTO> pubDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "games", ignore = true)
    @Mapping(target = "tables", ignore = true)
    void updateFromDTO(PubDTO pubDTO, @MappingTarget Pub pub);
}

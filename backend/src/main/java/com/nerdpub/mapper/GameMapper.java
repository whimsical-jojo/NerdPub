package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.GameDTO;
import com.nerdpub.model.Game;

@Mapper(componentModel = "spring")
public interface GameMapper {
    public GameDTO toDTO(Game game);
    List<GameDTO> toDTOs(List<Game> games);

    Game toEntity(GameDTO gameDTO);
    List<Game> toEntities(List<GameDTO> gameDTOs);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(GameDTO gameDTO, @MappingTarget Game game);
}

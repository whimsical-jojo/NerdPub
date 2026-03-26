package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.GameSessionDTO;
import com.nerdpub.model.GameSession;

@Mapper(componentModel = "spring")
public interface GameSessionMapper {
    @Mapping(target = "gameId", ignore = true)
    @Mapping(target = "tableId", ignore = true)
    @Mapping(target = "table.pubId", ignore = true)
    public GameSessionDTO toDTO(GameSession session);
    public List<GameSessionDTO> toDTOs(List<GameSession> sessions);

    @Mapping(target = "game.id", source = "gameId")
    @Mapping(target = "table.id", source = "tableId")
    public GameSession toEntity(GameSessionDTO sessionDTO);
    public List<GameSession> toEntities(List<GameSessionDTO> sessionDTOs);

    @Mapping(target = "game.id", source = "gameId")
    @Mapping(target = "table.id", source = "tableId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(GameSessionDTO sessionDTO, @MappingTarget GameSession session);
}

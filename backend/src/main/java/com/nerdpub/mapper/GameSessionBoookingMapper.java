package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.GameSessionBookingDTO;
import com.nerdpub.model.GameSessionBooking;

@Mapper (componentModel = "spring")
public interface GameSessionBoookingMapper {
    @Mapping(target = "sessionId", ignore = true)
    @Mapping(target = "memberId", ignore = true)
    @Mapping(target = "session.gameId", ignore = true)
    @Mapping(target = "session.tableId", ignore = true)
    @Mapping(target = "session.table.pubId", ignore = true)
    @Mapping(target = "member.password", ignore = true)
    @Mapping(target = "session.bookedSpots", source = "session.bookedSpots")
    public GameSessionBookingDTO toDTO (GameSessionBooking tableBooking);
    public List<GameSessionBookingDTO> toDTOs (List<GameSessionBooking> bookings);

    @Mapping(target = "session.id", source = "sessionId")
    @Mapping(target = "member.id", source = "memberId")
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "member", ignore = true)
    public GameSessionBooking toEntity (GameSessionBookingDTO dto);
    public List<GameSessionBooking> toEntities (List<GameSessionBookingDTO> dtos);

    @Mapping(target = "session.id", source = "sessionId")
    @Mapping(target = "member.id", source = "memberId")
    @Mapping(target = "session", ignore = true)
    @Mapping(target = "member", ignore = true)
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(GameSessionBookingDTO dto, @MappingTarget GameSessionBooking booking);
}

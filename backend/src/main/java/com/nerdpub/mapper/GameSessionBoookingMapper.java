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
    @Mapping(target = "sessionId", source = "session.id")
    @Mapping(target = "memberId", source = "member.id")
    public GameSessionBookingDTO toDTO (GameSessionBooking tableBooking);
    public List<GameSessionBookingDTO> toDTOs (List<GameSessionBooking> bookings);

    @Mapping(target = "session.id", source = "sessionId")
    @Mapping(target = "member.id", source = "memberId")
    public GameSessionBooking toEntity (GameSessionBookingDTO dto);
    public List<GameSessionBooking> toEntities (List<GameSessionBookingDTO> dtos);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(GameSessionBookingDTO dto, @MappingTarget GameSessionBooking booking);
}

package com.nerdpub.mapper;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.nerdpub.dto.TableBookingDTO;
import com.nerdpub.model.TableBooking;

@Mapper (componentModel = "spring")
public interface TableBoookingMapper {
    public TableBookingDTO toDTO (TableBooking tableBooking);
    public List<TableBookingDTO> toDTOs (List<TableBooking> tableBookings);

    public TableBooking toEntity (TableBookingDTO dto);
    public List<TableBooking> toEntities (List<TableBookingDTO> dtos);


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDTO(TableBookingDTO dto, @MappingTarget TableBooking tableBooking);
}

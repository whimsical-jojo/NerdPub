package com.nerdpub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.TableBooking;

@Repository
public interface TableBookingRepository extends JpaRepository<TableBooking, Integer> {

}

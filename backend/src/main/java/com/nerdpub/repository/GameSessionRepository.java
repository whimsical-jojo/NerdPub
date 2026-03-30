package com.nerdpub.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.nerdpub.model.GameSession;

@Repository
public interface GameSessionRepository extends JpaRepository<GameSession, Integer>{

    @Query("SELECT gs FROM GameSession gs WHERE gs.date >= CURRENT_DATE AND gs.date < :endDate")
    List<GameSession> findWithinDate(@Param("endDate") LocalDate endDate);

    /** Sessioni da oggi in poi (finestra massima), tutte le città. */
    @Query("SELECT DISTINCT gs FROM GameSession gs JOIN gs.table t JOIN t.pub p WHERE gs.date >= CURRENT_DATE AND gs.date <= :endDate ORDER BY gs.date ASC")
    List<GameSession> findUpcomingAll(@Param("endDate") LocalDate endDate);

    /** Sessioni da oggi in poi per una città (case-insensitive). */
    @Query("SELECT DISTINCT gs FROM GameSession gs JOIN gs.table t JOIN t.pub p WHERE LOWER(p.city) = LOWER(:city) AND gs.date >= CURRENT_DATE AND gs.date <= :endDate ORDER BY gs.date ASC")
    List<GameSession> findUpcomingByCity(@Param("city") String city, @Param("endDate") LocalDate endDate);
    
    default List<GameSession> search(String game, int days, String city)
    {
        // game potrebbe essere sia l'id del gioco sia un pezzo del testo del gioco 
        List<GameSession> sessions = findWithinDate(LocalDate.now().plusDays(days));
        if (game != null)
            sessions.stream().filter(x->x.getGame().getTitle().contains(game) || (x.getGame().getId()+"").equals(game)).toList();

        if (city != null)
            sessions.stream().filter(x->x.getTable().getPub().getCity().equals(city)).toList();

        return sessions;

    }

    List<GameSession> findByGameId(int gameId);

    List<GameSession> findByDateAndTableId(LocalDate parsedDate, int tableId);

    @Query("SELECT gs FROM GameSession gs JOIN gs.table t JOIN t.pub p WHERE p.city = ?1")
    List<GameSession> findByCity(String city);

}

package com.example.repositories;




import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.ListCrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.models.Utente;



@Repository
public interface UtenteRepository extends ListCrudRepository<Utente, Long>{
	
	Utente findByEmail(String email);

	Utente findByUsername(String username);

	 @Query(value = "SELECT r.nome FROM utenti u JOIN ruolo r ON u.id = r.id JOIN utente_ruolo ur ON u.id = ur.utente_id AND r.id = ur.role_id WHERE u.username = :username", nativeQuery = true)
	String findRoleByUsername(@Param("username") String username);
	
//	 @Query(value = "select * from utenti where email = ?1", nativeQuery = true)
//	 Optional<Utente> findByEmail(String email);
	  

}

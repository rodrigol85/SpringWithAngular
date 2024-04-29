package com.example.models;



import java.util.Collection;


import java.util.List;


import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;




import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "utenti")
public class Utente implements UserDetails {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true)
	private String username;
	
	private String password;
	
	private String name;
	
	private String surname;
	
	private String email;
	
	private String phone;
	
	private String profilo;
	
	private String tokenChangePass;
	
	@Enumerated(value = EnumType.STRING)
	private Role role;
	
	
//	
//	@OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "utente")
//	@JsonIgnore //per evitare le risposte infinite d'informazioni dell'utente quando si fa un get
//	private Set<UtenteRole> utenteRoles = new HashSet<>();
//	
	//private List<GrantedAuthority> roles;
//
//	public String getRuoliUtente() {
//	    StringBuilder ruoli = new StringBuilder();
//	    for (UtenteRole ruolo : utenteRoles) {
//	        ruoli.append(ruolo.toString());
//	        ruoli.append(", ");
//	    }
//	    // Rimuove l'ultima virgola e lo spazio
//	    if (ruoli.length() > 0) {
//	        ruoli.setLength(ruoli.length() - 2);
//	    }
//	    return ruoli.toString();
//	}


	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public String toString() {
		return "Utente [id=" + id + ", username=" + username + ", password=" + password + ", name=" + name
				+ ", surname=" + surname + ", email=" + email + ", phone=" + phone + ", profilo=" + profilo + ", role="
				+ role + "]";
	}

	

	
    
	
	
	
	
}

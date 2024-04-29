package com.example.security;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.example.models.Utente;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;


/**
 * In questa classe si trova tutta la configurazione che riguardano al token
 * per motivi di pratica il token in questo caso scade in 24 ore.
 * @author Rodrigo
 */
@Service
public class JwtService {
	
	private final String SECRET_KEY = "e496308b2003b1d498dfc4cec9cb09907206f7f7cb7baf7f10fd16ea8aa335f2";
	
	public String extractUsername(String token) {
		return extractClaim(token, Claims::getSubject);
	}
	
	public boolean isValid(String token, UserDetails utente) {
		String username = extractUsername(token);
		return (username.equals(utente.getUsername())) && !isTokenExpired(token);
	}
	
	private boolean isTokenExpired(String token) {
		
		return extractExpiration(token).before(new Date());
	}
	
	private Date extractExpiration(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public<T> T extractClaim(String token, Function<Claims, T> resolver) {
		Claims claims = extratAllClaims(token);
		return resolver.apply(claims);
	}
	
	private Claims extratAllClaims(String token) {
		return Jwts
				.parser()
				.verifyWith(getSigninKey())
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}
	
	public String generateToken(Utente utente) {
		String token = Jwts
				.builder()
				.subject(utente.getUsername())
				.issuedAt(new Date(System.currentTimeMillis()))
				.expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
				.signWith(getSigninKey())
				.compact();
		return token;
	}
	
	private SecretKey getSigninKey() {
		byte[] keyBytes = Decoders.BASE64URL.decode(SECRET_KEY);
		return Keys.hmacShaKeyFor(keyBytes);
	}

}

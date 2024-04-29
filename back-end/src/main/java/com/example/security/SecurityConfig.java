package com.example.security;



import org.springframework.context.annotation.Bean;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {


	private final OurUserInfoUserDetailsService userDetailsServiceImp;
	
	private final JwtAuthenticationFilter jwtAuthenticationFilter;
	

    public SecurityConfig(OurUserInfoUserDetailsService userDetailsServiceImp,
			JwtAuthenticationFilter jwtAuthenticationFilter) {
		super();
		this.userDetailsServiceImp = userDetailsServiceImp;
		this.jwtAuthenticationFilter = jwtAuthenticationFilter;
	}

	@Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
       // HeaderWriterLogoutHandler clearSiteData = new HeaderWriterLogoutHandler(new ClearSiteDataHeaderWriter(Directive.ALL)); //Directive.COOKIES

    	http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(requests -> requests
                		.requestMatchers("/login").permitAll()
                		.requestMatchers("/create").permitAll()
                		.requestMatchers("/generate-token", "/utente").permitAll()
                		.requestMatchers(HttpMethod.OPTIONS).permitAll()
                		.requestMatchers("/admin/**").hasAuthority("ADMIN")
                		.requestMatchers("/user/**").hasAuthority("USER")
                		.anyRequest()
                		.authenticated()
                 ).userDetailsService(userDetailsServiceImp)
                 .sessionManagement(session -> session
                		 .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                 .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
//                .formLogin(login -> login
//                		.defaultSuccessUrl("/user/logged"))
                .logout(logout -> logout
                		.deleteCookies("JSESSIONID")
                		.clearAuthentication(true)
                        .logoutUrl("logout"))
		    	.httpBasic(Customizer.withDefaults());
       return http.build();
    }
    
    @Bean
    public UserDetailsService userDetailsService() {
    	return new OurUserInfoUserDetailsService();
    }
    
    @Bean
    AuthenticationProvider authenticationProvider() {
    	DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
    	daoAuthenticationProvider.setUserDetailsService(userDetailsService());
    	daoAuthenticationProvider.setPasswordEncoder(passwordEnconder());
    	
    	return daoAuthenticationProvider;
    }
    
    @Bean
    public PasswordEncoder passwordEnconder() {
    	return new BCryptPasswordEncoder();
    }
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
    	return configuration.getAuthenticationManager();
    }
}   
    

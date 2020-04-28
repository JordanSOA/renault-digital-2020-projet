package com.renault.services;

import com.renault.models.Role;
import com.renault.models.User;
import com.renault.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailService {
    @Autowired
    private UserRepository userRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User byId = userRepository.findById(username).orElseThrow(() -> new UsernameNotFoundException("NO user with this name " + username ));
        List<Role> roles = byId.getRoles();
        Set<SimpleGrantedAuthority> collect = roles.stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toSet());
        return new org.springframework.security.core.userdetails.User(byId.getUsername(), byId.getPassword(), collect);
    }
}

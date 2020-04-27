package com.renault.services;

import com.renault.models.Role;
import com.renault.models.User;
import com.renault.repositories.RoleRepository;
import com.renault.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDetailService userDetailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public void verifyUser(String username, String password) {
        // TODO use the password encoder to check if the raw password matches the password in database
        UserDetails userDetails = userDetailService.loadUserByUsername(username);

        if(!passwordEncoder.matches(password, userDetails.getPassword())){
            throw new BadCredentialsException("Bad credentials"+ username);
        }
    }

    @Override
    @Transactional
    public void registerUser(String username, String password) {
        Role role = roleRepository.findById("USER").orElseThrow();
        User user = new User(username, passwordEncoder.encode(password), List.of(role), true);
        userRepository.save(user);
    }
}

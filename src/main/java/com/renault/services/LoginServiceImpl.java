package com.renault.services;

import com.renault.models.User;
import com.renault.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Override
    public boolean verifyUser(String username, String password) {
        /*
        Authentication token = new UsernamePasswordAuthenticationToken(username, password);
        Authentication authenticate = authenticationManager.authenticate(token);
        return authenticate.isAuthenticated();
        */

        User user = userRepository.findByUsername(username);
        if ((user == null)) {
            throw new BadCredentialsException("Invalid username or password");
        }
        Authentication result = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(user, result.getCredentials(), result.getAuthorities());
        return false;
    }

}

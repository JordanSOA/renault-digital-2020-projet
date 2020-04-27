package com.renault.controllers;

import com.renault.dtos.UserDto;
import com.renault.services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping("/login")
    public Boolean isUserExist(@RequestBody UserDto user){
        return loginService.verifyUser(user.getUsername(),user.getPassword());
    }
}

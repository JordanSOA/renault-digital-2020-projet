package com.renault.controllers;

import com.renault.dtos.UserDto;
import com.renault.services.LoginService;
import com.renault.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping
public class LoginController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public void isUserExist(@RequestBody UserDto user){
        //return loginService.verifyUser(user.getUsername(),user.getPassword());
        userService.verifyUser(user.getUsername(),user.getPassword());
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody UserDto userDto){
        userService.registerUser(userDto.getUsername(),userDto.getPassword());
    }
}

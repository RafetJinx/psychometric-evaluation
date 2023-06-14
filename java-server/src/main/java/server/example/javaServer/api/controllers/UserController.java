package server.example.javaServer.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.UserService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.UserFullNameInfo;
import server.example.javaServer.model.info.userTypes.UserInfo;

@RestController
@RequestMapping(value = "/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/getUserNameAndSurnameByUserId")
    public DataResult<UserFullNameInfo> getUserNameAndSurnameByUserId(String userId){
        return this.userService.getUserNameAndSurnameByUserId(userId);
    }

    @GetMapping(value = "/getUserInfoByUserId")
    public <T extends UserInfo> DataResult<T> getUserInfoByUserId(String userId){
        return this.userService.getUserInfoByUserId(userId);
    }

    @GetMapping(value = "/getUserInfoIfUserRegistered")
    public DataResult<UserInfo> getUserInfoIfUserRegistered(String username, String password){
        return this.userService.getUserInfoIfUserRegistered(username, password);
    }

    @GetMapping(value = "getUserRole")
    public DataResult<String> getUserRole(String userId){
        return this.userService.getUserRole(userId);
    }
}

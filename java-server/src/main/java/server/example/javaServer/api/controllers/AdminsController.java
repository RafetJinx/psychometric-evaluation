package server.example.javaServer.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.AdminService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.userTypes.Admin;

import java.util.List;

@RestController
@RequestMapping(value = "/api/admins")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminsController {
    private AdminService adminService;

    @Autowired
    public AdminsController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping(value = "/getAll")
    DataResult<List<Admin>>  getAll(){
        return this.adminService.getAll();
    }
}

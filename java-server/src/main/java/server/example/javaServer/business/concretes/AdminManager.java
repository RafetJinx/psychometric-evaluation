package server.example.javaServer.business.concretes;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import server.example.javaServer.business.abstracts.AdminService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.core.utilities.results.dataResult.error.ErrorDataResult;
import server.example.javaServer.core.utilities.results.dataResult.success.SuccessDataResult;
import server.example.javaServer.dataAccess.abstracts.AdminDao;
import server.example.javaServer.model.userTypes.Admin;
import server.example.javaServer.model.userTypes.Doctor;

import java.util.List;

@Service
public class AdminManager implements AdminService {
    private AdminDao adminDao;

    @Autowired
    public AdminManager(AdminDao adminDao) {
        this.adminDao = adminDao;
    }


    @Override
    public DataResult<List<Admin>> getAll() {
        List<Admin> admins = adminDao.findAll();

        if(admins == null){
            return new ErrorDataResult<List<Admin>>("Admins is null", null);
        }
        else if(admins.isEmpty()){
            return new ErrorDataResult<List<Admin>>("No admin was found", admins);
        } else {
            return new SuccessDataResult<List<Admin>>("All admins were brought.", admins);
        }
    }
}

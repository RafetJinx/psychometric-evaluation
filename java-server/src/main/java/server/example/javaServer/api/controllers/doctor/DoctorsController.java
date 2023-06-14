package server.example.javaServer.api.controllers.doctor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import server.example.javaServer.business.abstracts.doctor.DoctorService;
import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.userTypes.Doctor;

import java.util.List;

@RestController
@RequestMapping(value = "/api/doctorController")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorsController {
    private DoctorService doctorService;

    @Autowired
    public DoctorsController(DoctorService doctorService) {
        this.doctorService = doctorService;
    }

    @GetMapping(value = "/getAll")
    public DataResult<List<Doctor>> getAll() {
        return this.doctorService.getAll();
    }

    @GetMapping(value = "/getRelatedPatientIdsByDoctorId")
    public DataResult<List<String>> getRelatedPatientIdsByDoctorId(String doctorId){
        return this.doctorService.getRelatedPatientIdsByDoctorId(doctorId);
    }
}

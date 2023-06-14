package server.example.javaServer.api.controllers.doctor;

        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;
        import server.example.javaServer.business.abstracts.doctor.DoctorRelatedPatientService;
        import server.example.javaServer.core.utilities.results.dataResult.DataResult;
        import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
        import server.example.javaServer.model.userTypes.Patient;

        import java.util.List;

@RestController
@RequestMapping(value = "/api/doctorPatientsController")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorRelatedPatientsController {
    private DoctorRelatedPatientService doctorRelatedPatientService;

    @Autowired
    public DoctorRelatedPatientsController(DoctorRelatedPatientService doctorRelatedPatientService) {
        this.doctorRelatedPatientService = doctorRelatedPatientService;
    }

    @PostMapping(value = "/savePatient")
    DataResult<Patient> savePatient(@RequestBody Patient patient){
        return this.doctorRelatedPatientService.savePatient(patient);
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId")
    public DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId(String doctorId){
        return this.doctorRelatedPatientService.getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId(doctorId);
    }

    @GetMapping(value = "/getRelatedPatientNameAndSurnameAndIdByDoctorIdWithPatientId")
    public DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByDoctorIdWithPatientId(String doctorId, String patientId) {
        return this.doctorRelatedPatientService.getRelatedPatientNameAndSurnameAndIdByDoctorIdWithPatientId(doctorId, patientId);
    }
}

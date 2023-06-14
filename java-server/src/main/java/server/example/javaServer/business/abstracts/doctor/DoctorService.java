package server.example.javaServer.business.abstracts.doctor;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.userTypes.Doctor;

import java.util.List;

public interface DoctorService {
    DataResult<List<Doctor>> getAll();

    DataResult<List<String>> getRelatedPatientIdsByDoctorId(String doctorId);
}

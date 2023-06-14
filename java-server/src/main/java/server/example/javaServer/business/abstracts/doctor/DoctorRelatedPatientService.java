package server.example.javaServer.business.abstracts.doctor;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;
import server.example.javaServer.model.userTypes.Patient;

import java.util.List;

public interface DoctorRelatedPatientService {
    DataResult<Patient> savePatient(Patient patient);

    DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByDoctorId(String doctorId);

    DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByDoctorIdWithPatientId(String doctorId, String patientId);
}

package server.example.javaServer.business.abstracts.teacher;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

public interface TeacherRelatedPatientService {
    DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByTeacherId(String teacherId);

    DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByTeacherIdWithTeacherId(String teacherId, String patientId);
}

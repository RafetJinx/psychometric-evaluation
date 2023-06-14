package server.example.javaServer.business.abstracts.parent;

import server.example.javaServer.core.utilities.results.dataResult.DataResult;
import server.example.javaServer.model.info.mixedInfo.DptPatientInfo;

import java.util.List;

public interface ParentRelatedPatientService {
    DataResult<List<DptPatientInfo>> getRelatedPatientNameAndSurnameAndPatientNumberByParentId(String parentId);

    DataResult<DptPatientInfo> getRelatedPatientNameAndSurnameAndIdByParentIdWithPatientId(String parentId, String patientId);
}

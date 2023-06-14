package server.example.javaServer.model.info.mixedInfo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class ParentAndTeacherPatientTestInfo {
    /*
     * patient -> ad, soyad, numara
     * test -> test kodu, test adı
     * */

    private String id;

    private String name;

    private String surname;

    private String testCode;

    private String testName;
}

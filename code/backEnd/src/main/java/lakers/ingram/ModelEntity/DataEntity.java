package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "data", schema = "SummerProj", catalog = "")
public class DataEntity {
    private int dataId;
    private Integer number;
    private Timestamp date;
    private Integer windowId;

    @Id
    @Column(name = "dataId", nullable = false)
    public int getDataId() {
        return dataId;
    }

    public void setDataId(int dataId) {
        this.dataId = dataId;
    }

    @Basic
    @Column(name = "number", nullable = true)
    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    @Basic
    @Column(name = "date", nullable = true)
    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataEntity that = (DataEntity) o;
        return dataId == that.dataId &&
                Objects.equals(number, that.number) &&
                Objects.equals(date, that.date);
    }

    @Override
    public int hashCode() {

        return Objects.hash(dataId, number, date);
    }

    @Basic
    @Column(name = "windowId", nullable = true)
    public Integer getWindowId() {
        return windowId;
    }

    public void setWindowId(Integer windowId) {
        this.windowId = windowId;
    }
}

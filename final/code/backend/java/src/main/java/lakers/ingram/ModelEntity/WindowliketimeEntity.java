package lakers.ingram.ModelEntity;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

@Entity
@Table(name = "windowliketime", schema = "SummerProj", catalog = "")
@IdClass(WindowliketimeEntityPK.class)
public class WindowliketimeEntity implements Serializable {
    private int windowId;
    private Timestamp time;
    private Integer count;
    private Integer period;

    @Id
    @Column(name = "windowId", nullable = false)
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Id
    @Column(name = "time", nullable = false)
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Basic
    @Column(name = "count", nullable = true)
    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WindowliketimeEntity that = (WindowliketimeEntity) o;
        return windowId == that.windowId &&
                Objects.equals(time, that.time) &&
                Objects.equals(count, that.count);
    }

    @Override
    public int hashCode() {

        return Objects.hash(windowId, time, count);
    }

    @Id
    @Basic
    @Column(name = "period", nullable = false)
    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }
}

package lakers.ingram.ModelEntity;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

public class WindowliketimeEntityPK implements Serializable {
    private int windowId;
    private Timestamp time;
    private Integer period;

    @Column(name = "windowId", nullable = false)
    @Id
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Column(name = "time", nullable = false)
    @Id
    public Timestamp getTime() {
        return time;
    }

    public void setTime(Timestamp time) {
        this.time = time;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        WindowliketimeEntityPK that = (WindowliketimeEntityPK) o;
        return windowId == that.windowId &&
                Objects.equals(time, that.time);
    }

    @Override
    public int hashCode() {

        return Objects.hash(windowId, time);
    }

    @Column(name = "period", nullable = false)
    @Basic
    @Id
    public Integer getPeriod() {
        return period;
    }

    public void setPeriod(Integer period) {
        this.period = period;
    }
}

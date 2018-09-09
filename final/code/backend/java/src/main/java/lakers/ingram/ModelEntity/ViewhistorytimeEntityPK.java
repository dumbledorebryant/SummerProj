package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Objects;

public class ViewhistorytimeEntityPK implements Serializable {
    private int windowId;
    private Timestamp time;

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
        ViewhistorytimeEntityPK that = (ViewhistorytimeEntityPK) o;
        return windowId == that.windowId &&
                Objects.equals(time, that.time);
    }

    @Override
    public int hashCode() {

        return Objects.hash(windowId, time);
    }
}

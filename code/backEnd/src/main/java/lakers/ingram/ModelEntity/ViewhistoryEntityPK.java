package lakers.ingram.ModelEntity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ViewhistoryEntityPK implements Serializable {
    private int userId;
    private int windowId;

    @Column(name = "userId", nullable = false)
    @Id
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Column(name = "windowId", nullable = false)
    @Id
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ViewhistoryEntityPK that = (ViewhistoryEntityPK) o;
        return userId == that.userId &&
                windowId == that.windowId;
    }

    @Override
    public int hashCode() {

        return Objects.hash(userId, windowId);
    }
}

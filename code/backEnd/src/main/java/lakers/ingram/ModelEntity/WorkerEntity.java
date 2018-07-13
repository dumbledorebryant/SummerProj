package lakers.ingram.ModelEntity;

import javax.persistence.*;

@Entity
@Table(name = "worker", schema = "SummerProj", catalog = "")
public class WorkerEntity {
    private int windowId;
    private String password;

    @Id
    @Column(name = "window_id", nullable = false)
    public int getWindowId() {
        return windowId;
    }

    public void setWindowId(int windowId) {
        this.windowId = windowId;
    }

    @Basic
    @Column(name = "password", nullable = false, length = 45)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        WorkerEntity that = (WorkerEntity) o;

        if (windowId != that.windowId) return false;
        if (password != null ? !password.equals(that.password) : that.password != null) return false;

        return true;
    }

    @Override
    public int hashCode() {
        int result = windowId;
        result = 31 * result + (password != null ? password.hashCode() : 0);
        return result;
    }
}

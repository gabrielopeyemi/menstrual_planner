export default function Illustration() {
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "1em 0",
          textAlign: "center",
          gap: "2em",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p>Current day</p>
          <div
            style={{
              color: "red",
              height: "2em",
              width: "2em",
              background: "red",
              borderRadius: "100%",
            }}
          />
        </div>
        <div>
          <p>Fetile period</p>
          <div
            style={{
              color: "green",
              height: "2em",
              width: "2em",
              background: "green",
              borderRadius: "100%",
            }}
          />
        </div>

        <div>
          <p>safe period</p>
          <div
            style={{
              height: "2em",
              width: "2em",
              background: "black",
              borderRadius: "100%",
            }}
          />
        </div>

        <div>
          <p>menstrual period</p>
          <div
            style={{
              height: "2em",
              width: "2em",
              background: "tomato",
              borderRadius: "100%",
            }}
          />
        </div>

        <div>
          <p>ovulation period</p>
          <div
            style={{
              height: "2em",
              width: "2em",
              background: "blue",
              borderRadius: "100%",
            }}
          />
        </div>
      </div>
    </>
  );
}

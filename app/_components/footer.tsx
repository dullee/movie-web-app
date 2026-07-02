export default function Footer() {
  return (
    <div className="flex flex-row justify-between p-20 bg-[#4338CA] mt-13 text-white">
      <div>
        <p>Movie Z</p>
        <p>© 2024 Movie Z. All Rights Reserved.</p>
      </div>
      <div className="flex flex-row">
        <div className="flex flex-col pr-5">
          <p>Contact information</p>
          <div>
            <div>
              <p>Emial:</p>
              <p>support@movieZ.com</p>
            </div>
            <div>
              <p>Phone:</p>
              <p>+976 (11) 123-4567</p>
            </div>
          </div>
        </div>
        <div>
          <p>Follow us</p>
          <p>Facebook Instagram Twitter Youtube</p>
        </div>
      </div>
    </div>
  );
}

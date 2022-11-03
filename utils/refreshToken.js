const refreshToken = async (req, res) => {
    if (!req.cookies.refreshToken) {
      throw new ErrorHandler(401, "Token missing");
    }
    const tokens = await generateRefreshToken(
      req.cookies.refreshToken
    );
    res.header("auth-token", tokens.token);
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
    });
    res.json(tokens);
  };
  
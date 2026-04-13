//Sourced from https://man.freebsd.org/cgi/man.cgi?query=sysexits&manpath=FreeBSD+4.3-RELEASE
//Generated comments with Gemini

export enum SysExitCode {
  // It's all gucci gang
  EX_OK = 0,

  /** The command was used incorrectly (bad flags, syntax, etc.). */
  EX_USAGE = 64,

  /** The input data was incorrect. */
  EX_DATAERR = 65,

  /** An input file did not exist or was not readable. */
  EX_NOINPUT = 66,

  /** The specified user did not exist. */
  EX_NOUSER = 67,

  /** The specified host did not exist. */
  EX_NOHOST = 68,

  /** A service is unavailable or a support program is missing. */
  EX_UNAVAILABLE = 69,

  /** An internal software error occurred. */
  EX_SOFTWARE = 70,

  /** An operating system error (e.g., "cannot fork"). */
  EX_OSERR = 71,

  /** A system file (e.g., /etc/passwd) is missing or has errors. */
  EX_OSFILE = 72,

  /** An output file could not be created. */
  EX_CANTCREAT = 73,

  /** An error occurred during I/O on a file. */
  EX_IOERR = 74,

  /** Temporary failure; the user should try again later. */
  EX_TEMPFAIL = 75,

  /** The remote system returned an impossible protocol response. */
  EX_PROTOCOL = 76,

  /** Insufficient permission for the requested operation. */
  EX_NOPERM = 77,

  /** Something was found in an unconfigured or misconfigured state. */
  EX_CONFIG = 78,
}
